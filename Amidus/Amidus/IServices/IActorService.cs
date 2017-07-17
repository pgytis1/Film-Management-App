using Amidus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amidus.IServices
{
    public interface IActorService
    {
        string[] PostActor(string name);
        List<Actor> GetActors(string query);
        string[] UpdateActor(Actor actor);
        string[] DeleteActor(int id);
    }
}
