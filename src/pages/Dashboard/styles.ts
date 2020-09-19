import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
    hasError: boolean;
}

export const Title = styled.h1`
    margin-top: 80px;
    color: #3a3a3a;
    line-height: 56px;
    max-width: 450px;
    font-size: 48px;
`;

export const Form = styled.form<FormProps>`
    display: flex;

    margin-top: 40px;
    width: 700px;

    input {
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 2px solid #fff;
        border-right: 0;
        border-radius: 5px 0 0 5px;
        color: #3a3a3a;

        &::placeholder {
            color: #a8a8b3;
        }

        ${(props) => props.hasError && css`
            border-color: #c53030;
        `}
    }

    button {
        width: 210px;
        height: 70px;
        background: #04d361;
        border-radius: 0px 5px 5px 0px;
        border: 0;
        color: #fff;
        font-weight: bold;
        transition: .25s all;

        &:hover {
            background: ${shade(0.2, '#04d361')};
        }
    }
`;

export const InputError = styled.span`
    display: block;
    margin-top: 0.5rem;
    color: #c53030;
`;

export const Repositories = styled.div`
    margin-top: 80px;
    max-width: 700px;

    a {
        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;

        display: flex;
        align-items: center;
        transition: transform .2s;

        &:hover {
            transform: translateX(20px);
        }

        & + a {
            margin-top: 16px;
        }

        img {
            border-radius: 50%;
            width: 64px;
            height: 64px;
        }

        div {
            flex: 1;
            margin: 0 16px;

            strong {
                font-size: 20px;
                color: #3d3d4d;
            }

            p {
                font-size: 18px;
                color: #a8a8b3;
                margin-top: 4px;
            }
        }

        svg {
            margin-left: auto;
            color: #Cbcbd6;
        }
    }
`;