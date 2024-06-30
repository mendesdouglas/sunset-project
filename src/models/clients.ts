import { Clients } from "@prisma/client";
import prisma from '../config/prisma';

export const getAllCustomers = async (): Promise<Clients[]> => {
    return prisma.clients.findMany();
}

export const createClients = async (data: Omit<Clients, 'id'>): Promise<Clients> => {
    return prisma.clients.create({
        data,
    })
}