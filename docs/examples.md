# Example 1
Suppose that we have a system containing some users and we can add photo to them. Here we have two typeorm models:

```typescript
@Entity()
class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({
		length: 100
	})
	public name: string;

	@OneToMany(() => Photo, photo => photo.user)
	public photos: Photo[];
}
```

```typescript
@Entity()
class Photo {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({
		length: 100
	})
	public name: string;

	@Column('text')
	public description: string;

	@Column()
	public filename: string;

	@Column('smallint')
	public views: number = 0;

	@Column()
	public isPublished: boolean = true;

	@ManyToOne(() => User, user => user.photos)
	public user: User;
}
```

We want to have ability to create and fetch users and add some photos to them. To see how we can implement them using confork, check this [repository](https://github.com/noorzaie/sample-confork-app)
