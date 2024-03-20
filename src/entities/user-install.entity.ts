import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_installs')
export class UserInstall {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  param1: string;

  @Column({ type: 'varchar', length: 255 })
  param2: string;

  @Column({ type: 'varchar', length: 255 })
  param3: string;

  @Column({ type: 'varchar', length: 255 })
  param4: string;

  @Column({ type: 'varchar', length: 255 })
  param5: string;

  @Column({ type: 'varchar', length: 255 })
  param6: string;

  @Column({ type: 'varchar', length: 255 })
  ip: string;

  @Column({ type: 'varchar', length: 255 })
  userAgent: string;
}
