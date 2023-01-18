export function debounce<RetType>(fn: (...arguments_: any[]) => RetType, time: number) {
    let timeout: NodeJS.Timeout | null;

    return function (this: any, ...arguments_: any[]): Promise<RetType> {
        return new Promise(resolve => {
            const shouldCallNow = !timeout;

            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(() => {
                timeout = null;
                resolve(fn.apply(this, arguments_));
            }, time);

            if (shouldCallNow) {
                resolve(fn.apply(this, arguments_));
            }
        });
    };
}
