import { useEffect, useState } from "react"
import { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";


const CategoryList = () => {
    const { data: categories, refetch } = useGetCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const handleCreateCategory = async (e) => {
        e.preventDefault()
        if (!name) {
            toast.error("Category name is required")
            return
        }
        try {
            const result = await createCategory({ name }).unwrap();
            if (result.error) {
                toast.error(result.error)
            } else {
                setName("")
                toast.success(`${result.name} created successfully`)
                refetch();
            }
        } catch (error) {
            toast.error("Creating Category failed")
        }
    }
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!updatingName) {
            toast.error("Category name is required")
            return;
        }
        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id,
                name: updatingName
            }).unwrap();
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(`Category updated to ${result.name} `)
                refetch()
                setSelectedCategory(null)
                setUpdatingName("")
                setModalVisible(false)
            }

        } catch (error) {
            toast.error(error)
        }
    }
    const handleDeleteCategory = async (e) => {
        e.preventDefault();
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Category is deleted")
                setSelectedCategory(null)
                refetch()
                setModalVisible(false)

            }
        } catch (error) {
            console.error(error)
            toast.error("Failed")
        }
    }
    return (
        <div className='flex flex-col md:flex-row mx-auto ml-[10rem]'>
            {/* <AdminMenu /> */}
            <div className="md:w-3/4 p-3">
                <div className="h-12">Manage Categories</div>
                <CategoryForm
                    value={name}
                    setValue={setName}
                    handleSubmit={handleCreateCategory}
                />
                <br />
                <hr />
                <div className="flex flex-wrap ">
                    {
                        categories?.map((category) => (
                            <div key={category._id}>
                                <button
                                    className=" bg-white text-purple-600 border border-purple-500 rounded-lg py-2 px-4 m-3 hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                                    onClick={() => {
                                        {
                                            setModalVisible(true)
                                            setSelectedCategory(category)
                                            setUpdatingName(category.name)
                                        }
                                    }}
                                >
                                    {category.name}
                                </button>
                            </div>
                        ))
                    }
                </div>
                <Modal
                    isOpen={modalVisible}
                    onClose={(e) => setModalVisible(false)}
                >
                    <CategoryForm
                        value={updatingName}
                        setValue={(value) => setUpdatingName(value)}
                        handleSubmit={handleUpdateCategory}
                        buttonText="Update"
                        handleDelete={handleDeleteCategory}
                    />
                </Modal>
            </div>
        </div>
    )
}

export default CategoryList