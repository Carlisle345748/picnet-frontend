import {useEffect, useMemo} from "react";
import {useNavigate} from "react-router";
import {logout} from "./components/loginRegister/loginSlice";
import {ApolloError, useApolloClient} from "@apollo/client";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import format from "date-fns/format";
import {useSnackbar} from "notistack";
import {ErrorAlert, LoginExpireAlert} from "./components/alert/alert";
import {useAppDispatch} from "./store/hooks";


export const extract = <TNode, >(connection: { edges: Array<{ node: TNode }> }) => {
    return connection.edges
        .map(edge => edge.node)
}

export const distinctArray = <T, >(arr: T[]) => {
    return [...new Set(arr)]
}

export function useHandleGraphQLError(errors: (ApolloError | undefined)[]) {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const client = useApolloClient();

    useEffect(() => {
        const handleError = (err: Error) => {
            if (import.meta.env.MODE === "development") {
                console.log(JSON.stringify(err));
            }
            enqueueSnackbar(err.message, {
                preventDuplicate: true,
                autoHideDuration: 2000,
                content(key, message) {
                    return <ErrorAlert key={key} message={message}/>
                },
                anchorOrigin: {
                    vertical: "bottom", horizontal: "center"
                },
            });
        }

        errors.forEach((err) => {
            if (err) {
                const {graphQLErrors, networkError, clientErrors} = err;
                if (networkError) {
                    handleError(networkError);
                }
                if (clientErrors) {
                    clientErrors.forEach(handleError);
                }
                if (graphQLErrors) {
                    for (let err of graphQLErrors) {
                        handleError(err);
                        const {extensions} = err;
                        if (extensions?.code === 1001) {
                            dispatch(logout());
                            client.resetStore();
                            navigate("/login");
                            enqueueSnackbar("Login Expire", {
                                autoHideDuration: 1000,
                                anchorOrigin: {
                                    vertical: "bottom", horizontal: "center"
                                },
                                content(key, message) {
                                    return <LoginExpireAlert key={key} message={message}/>
                                }
                            });
                        }
                    }
                }
            }
        })
    }, [client, dispatch, enqueueSnackbar, errors, navigate]);
}


export const toNow = (date: string) => {
    const dateTime = new Date(date);
    const diffDays = Math.ceil((new Date().getTime() - dateTime.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 14) {
        return format(dateTime, "MMM d, yyyy")
    }
    return formatDistanceToNowStrict(dateTime);
}

export const getLocationMain = (location: string) => {
    return location.split(',')[0];
}

function debounce(this: any, fn: Function, ms: number) {
    let timer: number | null
    return () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

export function useResizeListener(onResize: (this: Window, ev: UIEvent) => any, debounceTime: number) {
    const debouncedOnResize = useMemo(() => debounce(onResize, debounceTime), [debounceTime]);

    useEffect(() => {
        window.addEventListener('resize', debouncedOnResize);
        return () => window.removeEventListener('resize', debouncedOnResize);
    }, [])
}
