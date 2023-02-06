import { db, doc, getDoc, collection } from '../../../../firebase';
import { compose,assoc } from 'ramda'


/** @type {import('./$types').PageLoad} */
export async function load({ params } : { params:any }) {
    const hiddenObject = params.hiddenObject

    const objectSnapshot = await getDoc(doc(collection(db,`/hiddenObjects/`),hiddenObject));

    const hiddenObjectData = {
        keyName: "Rubber Duck",
        displayName: "R&T Guestbook",
        deckNumber: "unknown",
        shipLocation: "unknown",
        description: "Sign Ryan and Tanner's virtual guestbook"
    }
    
    const objectQuery = objectSnapshot.exists() ? assoc("keyName",hiddenObject)(objectSnapshot.data()) : hiddenObjectData;

    const hiddenObjectFinal = compose(
        assoc("description",objectQuery.description),
        assoc("deck",objectQuery.deck),
        assoc("keyName",objectQuery.keyName),
        assoc("displayName",objectQuery.displayName),
    )(hiddenObjectData);

    return {
       key: hiddenObjectFinal.keyName,
       hiddenObject: hiddenObjectFinal
    };
}





