const { z } = require('zod');

exports.signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  contactNumber: z.string().min(10, 'Please enter all 10 digits'),
});

exports.signinSchema = z.object({
  contactNumber: z.string().min(9, 'Invalid number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
