import { db, orderBy, query, getDocs, limit, doc, getDoc, collection } from '../../firebase';


/** @type {import('./$types').PageLoad} */
export async function load({ params } : { params:any }) {
    const first = query(collection(db, "guestbook"), orderBy("created", "desc"), limit(25));
    const documentSnapshots = await getDocs(first);
    // Get the last visible document
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    console.log("last", lastVisible);
    let docs = [];
    documentSnapshots.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        docs.push(doc.data());
      });




    return {
       count: docs,
    };
}