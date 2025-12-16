import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService implements OnModuleInit {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    async onModuleInit() {
        // Clear existing data to ensure we have the correct schema and data
        // In a real production app, we would use a migration script instead
        const count = await this.productModel.countDocuments();

        // Check if we have the old "iPhone" data or empty db
        const oldData = await this.productModel.findOne({ name: 'iPhone 15 Pro' });

        if (count === 0 || oldData) {
            if (oldData) {
                await this.productModel.deleteMany({});
                console.log('Cleared legacy product data');
            }

            await this.productModel.create([
                {
                    name: 'Cloud Server Instance',
                    description: 'High-performance EC2 instance for demanding workloads. Auto-scaling enabled.',
                    price: 299.99,
                    image: '/placeholder.svg',
                    category: 'Compute',
                    stock: 50,
                },
                {
                    name: 'Managed PostgreSQL',
                    description: 'Fully managed relational database with automatic backups and replication.',
                    price: 149.99,
                    image: '/placeholder.svg',
                    category: 'Database',
                    stock: 100,
                },
                {
                    name: 'S3 Storage Bundle',
                    description: '1TB object storage with CDN integration and lifecycle policies.',
                    price: 49.99,
                    image: '/placeholder.svg',
                    category: 'Storage',
                    stock: 200,
                },
                {
                    name: 'Kubernetes Cluster',
                    description: 'Managed EKS cluster with auto-scaling node groups and monitoring.',
                    price: 599.99,
                    image: '/placeholder.svg',
                    category: 'Compute',
                    stock: 25,
                },
                {
                    name: 'Message Queue Pro',
                    description: 'SQS + RabbitMQ bundle for reliable async messaging at scale.',
                    price: 79.99,
                    image: '/placeholder.svg',
                    category: 'Messaging',
                    stock: 150,
                },
                {
                    name: 'MongoDB Atlas',
                    description: 'NoSQL document database with global distribution and real-time sync.',
                    price: 199.99,
                    image: '/placeholder.svg',
                    category: 'Database',
                    stock: 80,
                },
            ]);
            console.log('Seeded Cloud Infrastructure products');
        }
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
