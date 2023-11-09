import useSWR from 'swr';

export default function useLevels(
    levels: any,
    lang: string,
    clientId: string,
    baseUrl: string,
    token?: string,
    isTestnet?: boolean
) {
    const fetcher = (url: string) =>
        fetch(baseUrl + url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'client-id': clientId
            } as any
        }).then((res) => res.json());

    const shouldCallUseSWR = !!token;

    const { data: apiData, error } = useSWR(
        shouldCallUseSWR ? `/learn-and-earn/levels?language=${lang}` : null,
        fetcher
    );

    const formatedResponse =
        levels &&
        (levels.reduce((next: any, current: any) => {
            const { id, lang, data, alternate_languages, uid } = current;
            const { title, lessons, category } = data;

            const filteredLessons = lessons.filter((el: any) => !!el.lesson.id);

            return {
                ...next,
                [id]: {
                    alternate_languages,
                    category: category.id ?? '',
                    data,
                    lang,
                    lessons: filteredLessons,
                    title,
                    uid
                }
            };
        }, {}) as any);

    let data = [];

    if (apiData?.success) {
        data = apiData?.data?.rows?.map((item: any) => {
            const levelData: {
                totalLessons: number;
                totalReward: number;
                status: string;
                id: string;
            } = item;
            let apiLevel;

            if (formatedResponse && formatedResponse[item.prismicId]) {
                apiLevel = formatedResponse[item.prismicId];
            }

            return apiLevel
                ? {
                      ...apiLevel,
                      ...levelData,
                      totalReward: item?.data?.reward
                  }
                : null;
        });
    }

    const finalLevels = !isTestnet
        ? data.filter((item: any) => item?.data?.is_live === true)
        : data;

    let showData = [];

    if (clientId === '1') {
        const objectsFromPrismic =
            !!formatedResponse &&
            Object.values(formatedResponse).filter(
                (el: any) => el?.lang?.includes(lang)
            );

        const normalizedDataFromPrismic =
            !!objectsFromPrismic &&
            objectsFromPrismic.map((item: any) => ({
                ...item,
                status: 'available',
                totalLessons: item?.lessons?.length
            }));

        const notLoggedData = !!normalizedDataFromPrismic
            ? normalizedDataFromPrismic.filter(
                  (item: any) => item?.data?.is_live === true
              )
            : [];

        showData = !!finalLevels.length ? finalLevels : notLoggedData;
    } else {
        showData = finalLevels;
    }

    const levelsLoading = !data && !error;

    return {
        data: showData && showData.filter((item: any) => item !== null),
        levelsLoading
    };
}
