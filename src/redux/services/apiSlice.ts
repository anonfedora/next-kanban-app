import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/components/app/utils/firebaseConfig";

export const fireStoreApi = createApi({
    reducerPath: "firestoreApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Tasks"],
    endpoints: builder => ({
        fetchDataFromDb: builder.query<{ [key: string]: any }[], void>({
            async queryFn() {
                try {
                    const session = await getSession();
                    const { user } = session!;
                    const ref = collection(db, `users/${user?.email}/tasks`);
                    const querySnapshot = await getDocs(ref);
                    return { data: querySnapshot.docs.map(doc => doc.data()) };
                } catch (e) {
                    return { error: e };
                }
            },
            providesTags: ["Tasks"]
        }),

        updateBoardToDb: builder.mutation({
            async queryFn(boardData) {
                try {
                    const session = await getSession();
                    if (session?.user) {
                        const { user } = session;
                        const ref = collection(db, `users/${user.email}/tasks`);
                        const querySnapshot = await getDocs(ref);
                        const boardId = querySnapshot.docs.map(doc => {
                            return doc.id;
                        });
                        await updateDoc(
                            doc(db, `users/${user.email}/tasks/${boardId}`),
                            {
                                boards: boardData
                            }
                        );
                    }
                    return { data: null };
                } catch (error) {
                    return { error: e };
                }
            },
            invalidatesTags: ["Tasks"]
        })
    })
});

export const { useFetchDataFromDbQuery, useUpdateBoardToDbMutation } =
    fireStoreApi;
