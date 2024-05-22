import foodmodel from '../models/foodmodel.js';
import fs from 'fs';

// Add food item
 const addfood = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);
    
    let image_filename = req.file.filename;
    const food = new foodmodel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });
    
    try {
        await food.save();
        res.json({ success: true, message: 'Food added' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'Error: ' + error.message });
    }
};

//list food
const listfood=async (req,res)=>{
    try{
        const foods= await foodmodel.find({});
        res.json({success:true,data:foods})
    } catch(error)
    {
        res.json({success:false,message:"error"})

    }

}
//remove food 
const removefood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: 'Food not found' });
        }

        // Check if food.image is defined before attempting to delete the image file
        if (food.image) {
            // Delete the image file from the server
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                }
            });
        }

        // Remove the food item from the database
        await foodmodel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: 'Food removed' });
    } catch (error) {
        console.error('Error removing food:', error);
        res.json({ success: false, message: 'Error removing food' });
    }
};

export {addfood,listfood,removefood}

