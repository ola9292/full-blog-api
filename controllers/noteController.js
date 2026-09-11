import Note from '../db/models/Note.js';
import validator from 'validator';

export async function index(req, res){
    try{
        const notes = await Note.find().populate('user');

        res.status(200).json({
            data: notes
        })
    }catch(err){
         console.log(err)
        return res.status(500).json({ msg: "Server Error" });
    }
    
}
export async function show(req, res){
    const id = req.params.id

    try{
        const note = await Note.findById(id).populate('user')

        if(!note){
            return res.status(404).json({msg: "note not found"})
        }
        return res.status(200).json({data: note})
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Server Error" });
    }
}

export async function store(req, res)
{
    const { title, content } = req.body;
    const user_id = req.user.userId

    // 1. Check if fields exist and aren't just empty spaces
    if (!title || validator.isEmpty(title.trim())) {
        return res.status(400).json({ msg: "Title is required" });
    }

    if (!content || validator.isEmpty(content.trim())) {
        return res.status(400).json({ msg: "Content is required" });
    }

    // 2. Enforce length constraints
    if (!validator.isLength(title, { min: 3, max: 100 })) {
        return res.status(400).json({ msg: "Title must be between 3 and 100 characters" });
    }

  try{
    const cleanTitle = validator.escape(title.trim());
    const cleanContent = validator.escape(content.trim());

    const newNote = await Note.create({
        title: cleanTitle,
        content: cleanContent,
        user: user_id
    });

    const note = await Note.create(newBook);
    res.status(201).json({
        msg :"note created successfully",
        data: note
    })
  }catch(err){
    console.log(err)
    return res.status(500).json({ msg: "Server Error" });
  }
}


export async function update(req, res)
{
   const { title, content } = req.body;

     // 1. Check if fields exist and aren't just empty spaces
    if (!title || validator.isEmpty(title.trim())) {
        return res.status(400).json({ msg: "Title is required" });
    }

    if (!content || validator.isEmpty(content.trim())) {
        return res.status(400).json({ msg: "Content is required" });
    }

    // 2. Enforce length constraints
    if (!validator.isLength(title, { min: 3, max: 100 })) {
        return res.status(400).json({ msg: "Title must be between 3 and 100 characters" });
    }

    try{
        const cleanTitle = validator.escape(title.trim());
        const cleanContent = validator.escape(content.trim());
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
            title : cleanTitle,
            content: cleanContent,
            updatedAt: Date.now()
            },
            { new: true }
        ); 

        if(!updatedNote){
            return res.status(400).json({ msg: "Note not found" });
        }
        res.status(200).json(updatedNote)
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Server Error" });
    }
}

export async function destroy(req, res){
   try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        
        if (!deletedNote) {
            return res.status(404).json({ msg: "Note not found" });
        }

        return res.status(200).json({ 
            msg: "Note deleted successfully", 
            deletedNote 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
}  

// async function insertBookData() {
//   try {
//     await Book.insertMany([
//       {
//         name: "The Pragmatic Programmer",
//         author: "Andrew Hunt",
//         price: 45.99,
//         pages: 352
//       },
//       {
//         name: "Clean Code",
//         author: "Robert C. Martin",
//         price: 39.99,
//         pages: 464
//       },
//       {
//         name: "Node.js Design Patterns",
//         author: "Mario Casciaro",
//         price: 49.99,
//         pages: 588
//       },
//       {
//         name: "Eloquent JavaScript",
//         author: "Marijn Haverbeke",
//         price: 32.50,
//         pages: 472
//       },
//       {
//         name: "You Don't Know JS Yet",
//         author: "Kyle Simpson",
//         price: 29.99,
//         pages: 278
//       }
//     ]);
//     console.log("Mock books successfully inserted.");
//   } catch (error) {
//     console.log("Error inserting books:", error);
//   }
// }

// insertBookData();