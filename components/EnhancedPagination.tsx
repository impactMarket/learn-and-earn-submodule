import { Box, Button, Pagination, Text } from '@impact-market/ui';
import { Breakpoints } from '../helpers/Breakpoints';
import { colors } from '@impact-market/ui';
import styled from 'styled-components';

export const PaginationDestop = styled(Pagination)`
    @media (max-width: ${Breakpoints.medium}) {
        display: none;
    }
`;

export const PaginationMobile = styled(Box)`
    display: none;
    background-color: ${colors.g100};
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 86px;
    padding: 1rem 1rem 2rem 1rem;
    justify-content: space-between;
    align-items: center;

    p {
        color: ${colors.g700};
        font-size: 0.875rem;

        @media (max-width: ${Breakpoints.xxsmall}) {
            display: none;
        }
    }

    @media (max-width: ${Breakpoints.medium}) {
        display: flex;
    }

    .previous svg {
        rotate: 180deg;
    }
`;

function EnhancedPagination({
    currentPage,
    handlePageClick,
    pageCount,
    goToQuiz,
    isQuiz,
    canGotoQuiz,
    postAnswers,
    isLoading,
    previousLabel,
    nextLabel,
    submitLabel,
    infoLabel
}: any) {
    return (
        <>
            <PaginationDestop
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                mt={2}
                mobileText
                nextIcon="arrowRight"
                nextLabel={nextLabel}
                pageCount={pageCount}
                pb={2}
                previousIcon="arrowLeft"
                previousLabel={previousLabel}
            />
            <PaginationMobile style={{ marginTop: '100px' }}>
                <Button
                    className="previous"
                    gray
                    icon="chevronRight"
                    disabled={currentPage === 0}
                    onClick={() => handlePageClick('', 1)}
                >
                    {previousLabel}
                </Button>
                <Text>
                    {(!isQuiz || !(isQuiz && currentPage === pageCount - 1)) && infoLabel}
                </Text>
                {(!isQuiz || !(isQuiz && currentPage === pageCount - 1)) && (
                    <Button
                        className="next"
                        disabled={!canGotoQuiz && currentPage === pageCount - 1}
                        reverse
                        icon="chevronRight"
                        onClick={() =>
                            currentPage !== pageCount - 1
                                ? handlePageClick('', 2)
                                : goToQuiz(true)
                        }
                    >
                        {nextLabel}
                    </Button>
                )}
                {isQuiz && currentPage === pageCount - 1 && (
                    <Button
                        className="next"
                        style={{ flex: 1, marginLeft: '.75rem' }}
                        reverse
                        icon="chevronRight"
                        isLoading={isLoading}
                        onClick={() => postAnswers()}
                    >
                        {submitLabel}
                    </Button>
                )}
            </PaginationMobile>
        </>
    );
}

export default EnhancedPagination;
