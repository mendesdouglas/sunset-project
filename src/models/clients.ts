import { Clients } from "@prisma/client";
import prisma from '../config/prisma';

export const getAllClients = async (): Promise<Clients[]> => {
    return prisma.clients.findMany();
}

export const getClientsByEmail = async (email:string): Promise<Clients | null> => {
    return prisma.clients.findUnique({
        where: {
            email,
        }
    });
};

export const createClients = async (data: Omit<Clients, 'id'>): Promise<Clients> => {
    return prisma.clients.create({
        data,
    });
};

export const updateClient = async (id: number, data:  Partial<Clients>): Promise<Clients | null> => {
    return prisma.clients.update({
      where: { id },
      data,
    });
  };

export const deleteClient = async (id: number): Promise<Clients | null> => {
   return prisma.clients.delete({
      where: { id },
   });
};