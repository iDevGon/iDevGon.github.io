import { Container, Typo } from '@idevgon/design-system';
import { Link } from '@tanstack/react-router';
import {
  containerPaddingStyle,
  notFoundBodyStyle,
  notFoundLinkStyle,
  notFoundTitleStyle,
} from './-styles';

export function ArticleNotFound() {
  return (
    <Container className={containerPaddingStyle}>
      <Typo asChild variant="h1">
        <h1 className={notFoundTitleStyle}>Article Not Found</h1>
      </Typo>
      <Typo asChild variant="body1">
        <p className={notFoundBodyStyle}>요청하신 아티클을 찾을 수 없습니다.</p>
      </Typo>
      <Link to="/articles" className={notFoundLinkStyle}>
        &larr; 목록으로 돌아가기
      </Link>
    </Container>
  );
}
