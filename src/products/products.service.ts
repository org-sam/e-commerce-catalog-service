import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService implements OnModuleInit {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    async onModuleInit() {
        // Seed data if empty
        const count = await this.productModel.countDocuments();
        if (count === 0) {
            await this.productModel.create([
                {
                    name: 'iPhone 15 Pro',
                    description: 'The ultimate iPhone.',
                    price: 999,
                    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-black-titanium-select-202309?wid=940&hei=1112&fmt=png-alpha&.v=1692879353411',
                    stock: 100,
                },
                {
                    name: 'MacBook Pro 14"',
                    description: 'Mind-blowing. Head-turning.',
                    price: 1999,
                    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=904&hei=843&fmt=jpeg&qlt=90&.v=1632788573000',
                    stock: 50,
                },
                {
                    name: 'AirPods Pro',
                    description: 'Magic like you’ve never heard.',
                    price: 249,
                    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985',
                    stock: 200,
                },
            ]);
            console.log('Seeded initial products');
        }
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
