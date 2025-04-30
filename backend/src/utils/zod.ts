import { z } from 'zod';
import { PaymentMethod, OrderStatus, Category } from '../../generated/prisma';

const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '');
  
  return cpf.length === 11;
};

export const clientSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }),
  cpf: z.string({
    required_error: "CPF is required",
    invalid_type_error: "CPF must be a string"
  }).refine(validateCPF, {
    message: "CPF must have exactly 11 digits"
  }),
  phoneNumber: z.string({
    required_error: "Phone number is required",
    invalid_type_error: "Phone number must be a string"
  }),
  active: z.boolean().default(true),
  address: z.object({
    address: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string"
    }),
    region: z.string({
      required_error: "Region is required",
      invalid_type_error: "Region must be a string"
    }),
    postCode: z.string({
      required_error: "Post code is required",
      invalid_type_error: "Post code must be a string"
    }),
    country: z.string({
      required_error: "Country is required",
      invalid_type_error: "Country must be a string"
    })
  }),
});

export const clientUpdateSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be a string"
  }).optional(),
  cpf: z.string({
    invalid_type_error: "CPF must be a string"
  }).refine(
    (cpf) => cpf === undefined || cpf === null || validateCPF(cpf),
    {
      message: "CPF must have exactly 11 digits"
    }
  ).optional(),
  phoneNumber: z.string({
    invalid_type_error: "Phone number must be a string"
  }).optional(),
  active: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email({
    message: "Invalid email format"
  }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  }).min(8, {
    message: "Password must be at least 8 characters"
  }).max(20, {
    message: "Password must not exceed 20 characters"
  }),
});

export const orderSchema = z.object({
  clientId: z.string({
    required_error: "Client ID is required",
    invalid_type_error: "Client ID must be a string"
  }).uuid({
    message: "Invalid client ID format"
  }),
  addressId: z.string({
    required_error: "Address ID is required",
    invalid_type_error: "Address ID must be a string"
  }).uuid({
    message: "Invalid address ID format"
  }),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    required_error: "Payment method is required",
    invalid_type_error: "Invalid payment method"
  }),
  status: z.nativeEnum(OrderStatus, {
    invalid_type_error: "Invalid order status"
  }).default('PENDING'),
  orderItems: z.array(
    z.object({
      productId: z.string({
        required_error: "Product ID is required",
        invalid_type_error: "Product ID must be a string"
      }).uuid({
        message: "Invalid product ID format"
      }),
      quantity: z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number"
      }).int({
        message: "Quantity must be an integer"
      }).positive({
        message: "Quantity must be positive"
      }),
    })
  ).nonempty({
    message: "Order must contain at least one item"
  }),
});


export const orderUpdateSchema = z.object({
  status: z.nativeEnum(OrderStatus, {
    required_error: "Order status is required",
    invalid_type_error: "Invalid order status"
  }),
});

export const addressUpdateSchema = z.object({
  address: z.string({
    invalid_type_error: "Address must be a string"
  }).optional(),
  region: z.string({
    invalid_type_error: "Region must be a string"
  }).optional(),
  postCode: z.string({
    invalid_type_error: "Post code must be a string"
  }).optional(),
  country: z.string({
    invalid_type_error: "Country must be a string"
  }).optional(),
  clientId: z.string({
    invalid_type_error: "Client ID must be a string"
  }).uuid({
    message: "Invalid client ID format"
  }).optional(),
});

export const productSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string"
  }),
  category: z.nativeEnum(Category, {
    required_error: "Category is required",
    invalid_type_error: "Invalid category"
  }),
  size: z.string({
    required_error: "Size is required",
    invalid_type_error: "Size must be a string"
  }),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number"
  }).positive({
    message: "Price must be a positive number"
  }),
});

export const productUpdateSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be a string"
  }).optional(),
  description: z.string({
    invalid_type_error: "Description must be a string"
  }).optional(),
  category: z.nativeEnum(Category, {
    invalid_type_error: "Invalid category"
  }).optional(),
  size: z.string({
    invalid_type_error: "Size must be a string"
  }).optional(),
  price: z.number({
    invalid_type_error: "Price must be a number"
  }).positive({
    message: "Price must be a positive number"
  }).optional(),
});
