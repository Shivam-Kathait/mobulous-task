import { HttpException, HttpStatus } from '@nestjs/common';


export class EmailExist extends HttpException {
    constructor() {
        super("This email is already register. Please log in or use a different email address.", HttpStatus.BAD_REQUEST);
    }
}

export class PhoneNumberExist extends HttpException {
    constructor() {
        super("This phone number is already register. Please log in or use a different phone number.", HttpStatus.BAD_REQUEST);
    }
}

export class MissingLoginCreds extends HttpException {
    constructor() {
        super('Either email or phone number must be provided to log in.', HttpStatus.BAD_REQUEST);
    }
}

export class UserNotExist extends HttpException {
    constructor() {
        super(`User doesn't exist. Please sign-up.`, HttpStatus.BAD_REQUEST);
    }
}

export class InvalidPassword extends HttpException {
    constructor() {
      super('Incorrect password. Please try again.', HttpStatus.UNAUTHORIZED);
    }
  }
