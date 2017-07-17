using Amidus.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amidus.Models;
using System.Text.RegularExpressions;

namespace Amidus.Services
{
    public class ActorService : IActorService
    {
        private readonly AppDbContext dbContext;

        public ActorService(AppDbContext context)
        {
            this.dbContext = context;
        }

        public string[] DeleteActor(int id)
        {
            var itemToRemove = dbContext.Actors.FirstOrDefault(x => x.Id == id);

            if (itemToRemove == null)
            {
                return new[] { "Actor doesn't exist"};
            }

            dbContext.Actors.Remove(itemToRemove);
            dbContext.SaveChanges();

            return null;
        }

        public List<Actor> GetActors(string query)
        {
            var actors = new List<Actor>();
            if (!string.IsNullOrEmpty(query))
            {
                actors  = dbContext.Actors
                             .Where(x => (x.FullName).ToLower().Contains(query.ToLower()))
                             .ToList();
            }
            else
            {
                actors = dbContext.Actors.ToList();
            }
            return actors;
        }

        public string[] PostActor(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return new[] { "You need to specify actor's name" };
            }

            Actor actor = new Actor
            {
                FullName = name
            };

            dbContext.Actors.Add(actor);
            dbContext.SaveChanges();
            return new[] { "Success" };
        }

        public string[] UpdateActor(Actor actor)
        {
            var itemToUpdate = dbContext.Actors.FirstOrDefault(x => x.Id == actor.Id);

            if (itemToUpdate == null)
            {
                return new[] { "Actor doesn't exist" };
            }

            if (string.IsNullOrEmpty(actor.FullName))
            {
                return new[] { "You need to specify actor's name" };
            }

            itemToUpdate.FullName = actor.FullName;

            dbContext.SaveChanges();

            return null;
        }
    }
}
