import dayjs, { Dayjs } from 'dayjs';
import { RegisterOptions } from 'react-hook-form';

interface Rules {
  [key: string]: RegisterOptions;
}

// Los campos required se validan en el formulario con el atributo required
export const rules: Rules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Email is invalid',
    },
    minLength: {
      value: 4,
      message: 'Email is invalid',
    },
    maxLength: {
      value: 50,
      message: 'Email must have less than 50 characters',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
    maxLength: {
      value: 20,
      message: 'Password must have less than 20 characters',
    },
    // pattern: {
    //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    //   message:
    //     'Password must have at least one lowercase letter, one uppercase letter and one number',
    // },
    validate: {
      hasLowerCase: (value: string) =>
        /[a-z]/.test(value) ||
        'Password must have at least one lowercase letter',
      hasUpperCase: (value: string) =>
        /[A-Z]/.test(value) ||
        'Password must have at least one uppercase letter',
      hasNumber: (value: string) =>
        /\d/.test(value) || 'Password must have at least one number',
      // hasSpecialCharacter: (value: string) =>
      //   /[^A-Za-z0-9]/.test(value) ||
      //   'Password must have at least one special character',
    },
    deps: ['confirmPassword'], // Ejecuta la validación de confirmar contraseña cuando cambia la contraseña
  },
  confirmPassword: {
    required: 'Confirm password is required',
    validate: {
      matchesPreviousPassword: (
        value: string,
        fieldValues: Record<string, any>
      ) => value === fieldValues.password || 'Passwords do not match',
    },
  },
  firstName: {
    required: 'First name is required',
    maxLength: {
      value: 20,
      message: 'First name must have less than 20 characters',
    },
    minLength: {
      value: 2,
      message: 'Enter a valid first name',
    },
    pattern: {
      value: /^[a-zA-Z]+$/,
      message: 'Enter a valid first name',
    },
  },
  lastName: {
    required: 'Last name is required',
    maxLength: {
      value: 20,
      message: 'Last name must have less than 20 characters',
    },
    minLength: {
      value: 2,
      message: 'Enter a valid last name',
    },
    pattern: {
      value: /^[a-zA-Z]+$/,
      message: 'Enter a valid last name',
    },
  },
  birthDate: {
    required: 'Birth date is required',
    // valueAsDate: true,
    // shouldUnregister: true,
    validate: {
      isValidDate: (value: Dayjs) => {
        const isValid = value.isValid() && value.isAfter(dayjs('1900-01-01'));
        return isValid || 'Enter a valid date';
      },
      isAdult: (value: Dayjs) =>
        value.isBefore(dayjs().subtract(18, 'year')) ||
        'You must be at least 18 years old',
    },
  },
};
