"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { debounce } from '../../utils/debounce';

function TodoList() {

    const router = useRouter();

    const searchParams = useSearchParams()

    const search = searchParams.get("task");

    const queryClient = useQueryClient();

    const [todo, setTodo] = useState({
        task: "",
        completed: false
    })

    useEffect(() => {
        router.push("/?task=")
    }, [])

    const getAllTodos = async () => {
        const res = await axios.get("http://localhost:8080/api/todo?name=" + search);
        return res.data
    }
    const onCreateTodo = async () => {
        await axios.post("http://localhost:8080/api/todo", todo);
    }

    const onDeleteTodo = async (id) => {
        await axios.delete("http://localhost:8080/api/todo/" + id)
    }

    const { data, isLoading } = useQuery({
        queryKey: ['todos', { name: search }],
        queryFn: getAllTodos,
    })

    console.log(data);

    const mutation = useMutation({
        mutationFn: onCreateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        }
    })

    const onDelete = useMutation({
        mutationFn: ({ id }) => onDeleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        }
    })

    const handleInputChange = debounce((e) => {
        e.preventDefault();
        e.stopPropagation();
        const newFilteringValue = e.target.value;
        router.replace(`?task=` + newFilteringValue);
    }, 300);


    if (isLoading) return <h1>Loading..</h1>
    return (
        <div className='flex flex-col w-100 justify-center items-center'>
            <h1>Todo List</h1>
            <input className=' border-2 p-2 mb-2' value={todo.task} onChange={(e) => setTodo({ ...todo, task: e.target.value })} />
            <button className=' bg-blue-400 p-2 border-separate text-white mb-3' onClick={() => mutation.mutate()}>Create Todo</button>

            <input placeholder='Filtering...' className=' border-2 p-2 mb-2' onChange={(e) => handleInputChange(e)}></input>


            <div>{data?.map((el, i) => <li onClick={() => onDelete.mutate({ id: el.id })} key={el.task + i}>{el.task}</li>)}</div>
        </div>
    )
}

export default TodoList;