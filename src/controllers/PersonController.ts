import { Request, Response } from 'express';
import { PersonRepository } from '../models/PersonRepository';
import { Person } from '../models/Person';

export class PersonController {
  private repository: PersonRepository;

  constructor() {
    this.repository = new PersonRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const person: Person = req.body;
      const newPerson = await this.repository.create(person);
      res.status(201).json(newPerson);
    } catch (error) {
      res.status(500).json({ error: 'Error creating person' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const persons = await this.repository.findAll();
      res.json(persons);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching persons' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const person = await this.repository.findById(id);
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching person' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const person: Person = req.body;
      const updatedPerson = await this.repository.update(id, person);
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating person' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.repository.delete(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting person' });
    }
  }
}