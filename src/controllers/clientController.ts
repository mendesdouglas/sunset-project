import {Request, Response } from 'express';
import { createClients, getAllClients, getClientsByEmail } from '../models/clients';
      

export const getClients = async (req: Request, res: Response) => {
    try {
      const clients = await getAllClients();
      console.log('teste')
      res.json(clients);
    } catch (e) {
        const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  };


export const addClient = async ( req: Request, res: Response) => {
    const {name, address, city, state, zip, email, phone } = req.body;
    try {
        if (!name || !address || !city || !state || !zip || !email) {
            return res.status(400).json({ error: 'Verificar os campos obrigatórios' });
        }
        console.log('add')
        const verifiedEmail  = await VerifyUniqueEmail(email);
        console.log(verifiedEmail);
        if(verifiedEmail) {
             throw new Error ('Email inválido ou em uso')
        }else{
            const client = await createClients({name, email, address, city, state, zip, phone});
            res.json(client);
        }
    }catch(err){
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
}

export const VerifyUniqueEmail = async ( email:string) => {
    try {
        const uniqueEmail = await getClientsByEmail(email);
        return uniqueEmail;
    } catch(err){
        const error = err as Error;
        throw new Error ("Ocorreu um erro");
    }
}


