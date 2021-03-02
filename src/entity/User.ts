import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcrypt";
import { generateToken } from "../utlis/token";

const BCRYPT_ROUNDS = 10;

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ length: 255 })
  username!: string;

  @Column({ length: 255 })
  password!: string;

  generateUserToken() {
    // refresh token is valid for 30days
    const accessToken = generateToken(
      {
        id: this.id,
      },
      {
        subject: "access_token",
        expiresIn: "7d",
      }
    );

    return {
      accessToken,
    };
  }
  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}
