import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.header`
    background-color: #222;
`;

export default function Header() {
    return (
        <StyledHeader>
            <Link href={'/'}>Capputeeno</Link>
            <nav>
                <Link href={'/search'}>Search</Link>
                <Link href={'/cart'}>Cart (0)</Link>
            </nav>
        </StyledHeader>
    )
}