import { db, doc, getDoc, collection } from '../../../../firebase';
import { compose,assoc } from 'ramda'


/** @type {import('./$types').PageLoad} */
export async function load({ params } : { params:any }) {
    const hiddenObject = params.hiddenObject

    const objectSnapshot = await getDoc(doc(collection(db,`/hiddenObjects/`),hiddenObject));

    const hiddenObjectData = {
        deckNumber: "unknown",
        shipLocation: "unknown",
        description: "unknown"
    }
    
    const objectQuery = objectSnapshot.exists() ? objectSnapshot.data() : hiddenObjectData;

    const hiddenObjectFinal = compose(
        assoc("description",objectQuery.description),
    )(hiddenObjectData);

    return {
       key: hiddenObject,
       hiddenObject: hiddenObjectFinal
    };
}





