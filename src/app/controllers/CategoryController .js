// controllers/CategoryController.js

const Category = require('../models/Category');

const CategoryController = {
    async createCategory(req, res) {
        try {
            const { name, parentCategoryId } = req.body;
            let parentCategory = null;
            if (parentCategoryId) {
                parentCategory = await Category.findById(parentCategoryId);
                if (!parentCategory) {
                    return res.status(404).json({ message: 'Parent category not found' });
                }
            }
    
            const newCategory = new Category({ name });
            if (parentCategory) {
                newCategory.parentCategory = parentCategory;
            }
    
            await newCategory.save();
    
            if (parentCategory) {
                parentCategory.childrenCategories.push(newCategory._id);
                await parentCategory.save();
            }
    
            res.status(201).json({ message: 'Category created successfully', category: newCategory });
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ message: error.message });
        }
    },
    
    async getAllCategories(req, res) {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            console.error('Error getting categories:', error);
            res.status(500).json({ message: error.message });
        }
    },
    
    async getCategoryById(req, res) {
        try {
            const categoryId = req.params.id;
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error('Error getting category by ID:', error);
            res.status(500).json({ message: error.message });
        }
    },
    
    async updateCategory(req, res) {
        try {
            const categoryId = req.params.id;
            const { name, parentCategoryId } = req.body;
            let parentCategory = null;
            if (parentCategoryId) {
                parentCategory = await Category.findById(parentCategoryId);
                if (!parentCategory) {
                    return res.status(404).json({ message: 'Parent category not found' });
                }
            }
    
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            category.name = name;
            category.parentCategory = parentCategory;
            await category.save();
    
            res.status(200).json({ message: 'Category updated successfully', category });
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ message: error.message });
        }
    },
    
    async deleteCategory(req, res) {
        try {
            const categoryId = req.params.id;
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            // Remove category from parent category's children array
            if (category.parentCategory) {
                const parentCategory = await Category.findById(category.parentCategory);
                if (parentCategory) {
                    parentCategory.childrenCategories = parentCategory.childrenCategories.filter(childId => childId.toString() !== categoryId);
                    await parentCategory.save();
                }
            }
    
            await Category.findByIdAndDelete(categoryId);
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ message: error.message });
        }
    },

    async deleteSubCategory(req, res) {
        try {
            const subCategoryId = req.params.subCategoryId;
            const subCategory = await Category.findByIdAndDelete(subCategoryId);
            if (!subCategory) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }
            res.status(200).json({ message: 'Subcategory deleted successfully' });
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            res.status(500).json({ message: error.message });
        }
    },

    async updateSubCategory(req, res) {
        try {
            const subCategoryId = req.params.subCategoryId;
            const { name, parentCategoryId } = req.body;
            let parentCategory = null;
            if (parentCategoryId) {
                parentCategory = await Category.findById(parentCategoryId);
                if (!parentCategory) {
                    return res.status(404).json({ message: 'Parent category not found' });
                }
            }

            const subCategory = await Category.findById(subCategoryId);
            if (!subCategory) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }

            subCategory.name = name;
            subCategory.parentCategory = parentCategory;
            await subCategory.save();

            res.status(200).json({ message: 'Subcategory updated successfully', subCategory });
        } catch (error) {
            console.error('Error updating subcategory:', error);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = CategoryController;
