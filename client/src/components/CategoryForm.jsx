import React from 'react'

const CategoryForm = ({ value, setValue, handleSubmit, buttonText = 'Add', handleDelete = null }) => {
    return (
        <div className='p-3'>
            <form
                onSubmit={handleSubmit}
                className='space-y-3'
            >
                <input
                    className='py-3 px-4 border rounded-lg w-full '
                    placeholder='Write Category name'
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className="flex justify-between">
                    <button
                        className='bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
                    >{buttonText}</button>
                    {
                        handleDelete && (
                            <button
                                className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default CategoryForm