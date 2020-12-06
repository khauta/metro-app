const subKey = "d3AEXSjTLWi7zaPiRrRNaMxNO4GtZ366avMgDoZmm3U";

export async function getNearbyStops(locationString: string) {
    const idData = await getMetroAreaID(locationString);
    console.log(idData);

    const response = await fetch(`https://atlas.microsoft.com/mobility/transit/nearby/json?api-version=1.0&query=${locationString}&subscription-key=${subKey}&radius=${500}&metroId=${idData.results[0].metroId}`);
    const data = await response.json();
    console.log(data);

    return data;
}

const getMetroAreaID = async (locationString: string) => {
    const response = await fetch(`https://atlas.microsoft.com/mobility/metroArea/id/json?api-version=1.0&query=${locationString}&subscription-key=${subKey}`);
    const data = await response.json();
    console.log(data);

    return data;
}