// firebase.ts 파일로 분리하여 관리해도 좋습니다.
import { initializeApp } from "firebase/app";
import {
    collection,
    DocumentData,
    Firestore,
    getFirestore,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import { Todo, TodoTable } from "./constants/Dummy";

// Firebase 설정 객체를 가져옵니다.
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Firestore 초기화
const db: Firestore = getFirestore(app);
type WithId<T> = T & { id: string };

// 제네릭 컨버터 생성
const converter = <T>() => ({
    toFirestore: (doc: WithId<T> | T) => {
        const { ...data } = doc as WithId<T>;
        return data;
    },
    fromFirestore: (snap: QueryDocumentSnapshot<DocumentData>) => {
        return { ...(snap.data() as T), id: snap.id };
    },
});

// 제네릭 타입의 Firestore 컬렉션을 생성하는 함수
const dataPoint = <T>(collectionPath: string) => {
    return collection(db, collectionPath).withConverter(converter<T>());
};

// 사용할 컬렉션을 정의
const dbCollections = {
    todos: dataPoint<Omit<Todo, "id">>("todos"), // 예시로 'Todo' 타입 컬렉션
    todoTable: dataPoint<Omit<TodoTable, "id">>("todoTable"),
};

export { db, dbCollections };
export default db;
