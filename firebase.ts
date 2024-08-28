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
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
} from "@env";

// Firebase 설정 객체를 가져옵니다.
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
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
