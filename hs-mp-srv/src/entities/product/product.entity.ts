import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'title', type: 'varchar' })
  title!: string

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string | null

  @Column({ name: 'price', type: 'numeric' })
  price!: number

  @Column({ name: 'price_discounted', type: 'numeric', nullable: true })
  priceDiscounted?: number | null

  @Column({ name: 'image', type: 'varchar', nullable: true })
  image?: string | null
}
