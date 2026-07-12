import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Employeeservice } from './employeeservice';
import { Employee, CreateEmployee } from './models/employeemodel';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  employees: Employee[] = [];
  hasLoaded = false;

  // Reference to the Name input field, used to auto-focus it on load
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  // MODIFIED: Added reference to the form template for validation checks
  // This allows us to access form.valid and form.invalid in the template and TypeScript
  @ViewChild('employeeForm') employeeForm!: NgForm;

  // Model bound to the form (used for both Create and Update)
  currentEmployee: Employee = {
    id: 0,
    name: '',
    email: '',
    department: '',
    salary: null
  };

  isEditMode = false;

  // --- Status message shown to the user after add/update/delete ---
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  private messageTimeout: any;

  constructor(private employeeservice: Employeeservice) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Move cursor to the Name field as soon as the component finishes loading
    this.nameInput.nativeElement.focus();
  }

  loadEmployees(): void {
    this.employeeservice.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.hasLoaded = true;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.employees = [];
        this.hasLoaded = true;
      }
    });
  }

  onSubmit(): void {
    // MODIFIED: Defensive validation - check if form is invalid before proceeding
    // This prevents invalid data from being submitted even if onSubmit() is called programmatically
    if (!this.employeeForm.valid) {
      console.warn('Form is invalid. Cannot submit.');
      this.showMessage('Please fix the errors before submitting', 'error');
      return;
    }

    // Additional defensive validation checks
    if (!this.validateEmployeeData()) {
      console.warn('Employee data validation failed');
      this.showMessage('Invalid employee data', 'error');
      return;
    }

    if (this.isEditMode) {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  /**
   * ADDED: Validates employee data before submission
   * This provides a second line of defense against invalid data
   * 
   * Returns true if all data is valid, false otherwise
   */
  private validateEmployeeData(): boolean {
    const { name, email, department, salary } = this.currentEmployee;

    // Validate Name
    if (!name || name.trim().length < 3) {
      console.error('Name must be at least 3 characters');
      return false;
    }

    // Validate Email format
    if (!email || !this.isValidEmail(email)) {
      console.error('Invalid email format');
      return false;
    }

    // Validate Department
    if (!department || department.trim().length < 2) {
      console.error('Department must be at least 2 characters');
      return false;
    }

    // Validate Salary
    if (salary === null || salary === undefined || salary <= 0) {
      console.error('Salary must be greater than 0');
      return false;
    }

    return true;
  }

  /**
   * ADDED: Helper function to validate email format
   * Uses a simple regex pattern for email validation
   * (Angular's email validator uses a similar approach)
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  addEmployee(): void {
    const newEmployee: CreateEmployee = {
      name: this.currentEmployee.name.trim(),
      email: this.currentEmployee.email.trim(),
      department: this.currentEmployee.department.trim(),
      salary: this.currentEmployee.salary
    };

    this.employeeservice.addEmployee(newEmployee).subscribe({
      next: () => {
        this.resetForm();
        this.showMessage('Successfully saved', 'success');
        // Note: table is intentionally NOT refreshed/opened here.
        // It only loads when the user clicks "View Employees".
      },
      error: (err) => {
        console.error('Error adding employee:', err);
        this.showMessage('Failed to save employee', 'error');
      }
    });
  }

  editEmployee(emp: Employee): void {
    this.isEditMode = true;
    this.currentEmployee = { ...emp };
  }

  updateEmployee(): void {
    this.employeeservice.updateEmployee(this.currentEmployee).subscribe({
      next: () => {
        this.loadEmployees();
        this.resetForm();
        this.showMessage('Successfully updated', 'success');
      },
      error: (err) => {
        console.error('Error updating employee:', err);
        this.showMessage('Failed to update employee', 'error');
      }
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeservice.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
          this.showMessage('Successfully deleted', 'success');
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          this.showMessage('Failed to delete employee', 'error');
        }
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.currentEmployee = {
      id: 0,
      name: '',
      email: '',
      department: '',
      salary: null
    };
    // MODIFIED: Reset form validation state
    // This clears any error messages and touched/dirty states
    if (this.employeeForm) {
      this.employeeForm.resetForm();
    }
  }

  /**
   * Called when Enter is pressed in a field (except the last one)
   * Prevents the form from submitting early, and moves focus to the next field.
   */
  focusNext(event: Event, nextField: HTMLInputElement): void {
    event.preventDefault();
    nextField.focus();
  }

  /**
   * Called when Enter is pressed in the last field (Salary)
   * Submits the form, same as clicking Add/Update Employee.
   */
  onEnterSubmit(event: Event): void {
    event.preventDefault();
    // MODIFIED: Only submit if form is valid
    if (this.employeeForm && this.employeeForm.valid) {
      this.onSubmit();
    }
  }

  /**
   * Called on (input) from the form fields
   * As soon as the user starts typing to create a new employee,
   * hide the table / "no employees" message. It only reappears
   * when "View Employees" is clicked again.
   */
  onFormInput(): void {
    if (this.hasLoaded) {
      this.hasLoaded = false;
    }
  }

  /**
   * Shows a temporary status message (toast notification)
   * Automatically dismisses after 3 seconds
   * 
   * @param text - The message text to display
   * @param type - The message type: 'success' or 'error'
   */
  private showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    this.messageType = type;

    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    this.messageTimeout = setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}