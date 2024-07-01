import { Product } from "@prisma/client";
import prisma from '../config/prisma';

export const getAllProducts = async(): Promise<Product[]> => {
    return prisma.product.findMany();
}

export const createProduct = async (data: Omit<Product, 'id'>): Promise<Product> => {
    return prisma.product.create({
        data,
    });
};