using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private static readonly List<TodoItem> _todos = new List<TodoItem>
    {
        new TodoItem { Id = 1, Title = "Learn ASP.NET Core", IsCompleted = true },
        new TodoItem { Id = 2, Title = "Learn Next.js", IsCompleted = true },
        new TodoItem { Id = 3, Title = "Build a full-stack app", IsCompleted = false }
    };

    [HttpGet]
    public ActionResult<IEnumerable<TodoItem>> GetAll()
    {
        return Ok(_todos);
    }

    [HttpGet("{id}")]
    public ActionResult<TodoItem> GetById(int id)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }
        return Ok(todo);
    }

    [HttpPost]
    public ActionResult<TodoItem> Create(TodoItem todo)
    {
        todo.Id = _todos.Count > 0 ? _todos.Max(t => t.Id) + 1 : 1;
        _todos.Add(todo);
        return CreatedAtAction(nameof(GetById), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, TodoItem todo)
    {
        var existingTodo = _todos.FirstOrDefault(t => t.Id == id);
        if (existingTodo == null)
        {
            return NotFound();
        }

        existingTodo.Title = todo.Title;
        existingTodo.IsCompleted = todo.IsCompleted;

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }

        _todos.Remove(todo);
        return NoContent();
    }
}

public class TodoItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}
