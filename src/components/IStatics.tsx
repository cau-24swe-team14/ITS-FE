export interface INewProps {
    daily: {
        data: {
            date: string,
            count: number
        }[];
    },
    monthly: {
        data: {
            date: string,
            count: number
        }[];
    }
}

export interface IClosedProps {
    daily: {
        data: {
            date: string,
            count: number
        }[];
    },
    monthly: {
        data: {
            date: string,
            count: number
        }[];
    }
}

export interface ITopProps {
    daily: {
        data:{
            issueId: number,
            title: string,
            count: number
        }[];
    },
    monthly: {
        data:{
            issueId: number,
            title: string,
            count: number
        }[];
    }
}

export interface IBestProps {
    weekly: {
        data: {
            PL: {
                username: string,
                count: number
            }[];
            DEV:{
                username: string,
                count: number
            }[];
            TESTER:{
                username: string,
                count: number
            }[];
        }
    }
}