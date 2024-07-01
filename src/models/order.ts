import { Order } from "@prisma/client";
import prisma from '../config/prisma';

export const getAllOrders = async (): Promise<Order[]> => {
    return prisma.order.findMany();
}

export const createOrder = async ( data: Omit<Order, 'id'>):Promise<Order> => {
    return prisma.order.create({
        data,
    });
};