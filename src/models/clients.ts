import { Clients } from "@prisma/client";
import prisma from '../config/prisma';

/*
SQL REFERENCES

select * from clientes;
*/
export const getAllClients = async (): Promise<Clients[]> => {
    return prisma.clients.findMany();
}


//select * from clientes c where c.email = email;
export const getClientsByEmail = async (email:string): Promise<Clients | null> => {
    return prisma.clients.findUnique({
        where: {
            email,
        }
    });
};

/*
insert into clientes (name, email, address, city, state, zip, phone) 
values(name, email, address, city, state, zip, phone)
*/

export const createClients = async (data: Omit<Clients, 'id'>): Promise<Clients> => {
    return prisma.clients.create({
        data,
    });
};

/* update clientes 
set name = "name", 
address = "address", 
city="city",
state="state",
zip="zip",
phone="phone" 
where id=id */
export const updateClient = async (id: number, data:  Partial<Clients>): Promise<Clients | null> => {
    return prisma.clients.update({
      where: { id },
      data,
    });
  };

/* delete from clientes where id=id  */
export const deleteClient = async (id: number): Promise<Clients | null> => {
   return prisma.clients.delete({
      where: { id },
   });
};