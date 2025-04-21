import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";

export class SignupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'first name is required' })
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'last name is required' })
  last_name: string;

  @ApiProperty({ default: "john@yopmail.com" })
  @IsEmail({}, { message: 'Email must be an valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'phone number is required' })
  phone_number: string;

  @ApiProperty({ default: "Test@123" })
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters long' })
  @IsNotEmpty({ message: 'password is required' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  @IsString()
  password: string;
}


export class LoginDto {
  @ApiProperty({ default: "john@yopmail.com" })
  @IsEmail({}, { message: 'Email must be an valid email address' })
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone_number: string;

  @ApiProperty({ default: "Test@123" })
  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;
}