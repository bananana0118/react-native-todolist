import { Todo, TodoTable } from "@/constants/Dummy";
import { dbCollections } from "@/firebase";
import {
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";

export const addDataTodo = async ({
    task,
    date,
}: {
    task: string;
    date: string;
}) => {
    try {
        const todoData = {
            date,
            task: task,
            completed: false,
        };

        //'todo' 생성시 todoTable에도 추가되는 로직
        const todoRef = await addDoc(dbCollections.todos, todoData);

        const todoTableQuery = query(
            dbCollections.todoTable,
            where("date", "==", date)
        );

        // 쿼리 결과를 가져오기
        const querySnapshot = await getDocs(todoTableQuery);

        //'todoTable' 생성및해당 목적의 문서가 있는지 확인

        //1. 기존의 자료가 없을 시, 2. 기존의 자료가 있을 시
        if (querySnapshot.empty) {
            await addDoc(dbCollections.todoTable, {
                date: todoData.date,
                todos: [{ ...todoData, id: todoRef.id }],
            });
        } else {
            const existingDoc = querySnapshot.docs[0];

            await updateDoc(existingDoc.ref, {
                todos: [
                    ...existingDoc.data().todos,
                    { ...todoData, id: todoRef.id },
                ],
            });
            console.log("Existing todoTable document updated for date:", date);
        }
        console.log("todo Document written with ID: ", todoRef.id);

        return 200;
    } catch (e) {
        console.error("Error adding document: ", e);
        return 400;
    }
};

type ReturnTodosType = Promise<TodoTable[]>;

export const readDataTodoTable = async ({
    date,
}: {
    date: string;
}): ReturnTodosType => {
    try {
        // 'todos' 콜렉션 참조
        console.log(date);
        const q = query(dbCollections.todoTable, where("date", "==", date));

        const querySnapShot = await getDocs(q);

        if (querySnapShot.empty) {
            return [];
        } else {
            const existingDoc = querySnapShot.docs[0];

            const returnData = {
                id: existingDoc.id,
                date: existingDoc.data().date,
                todos: existingDoc.data().todos,
            };

            return [returnData];
        }
    } catch (error) {
        console.error("error fetching all todos : ", error);
        return Promise.resolve([]);
    }
};
