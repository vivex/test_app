import { render, screen } from "@testing-library/react";
import { SearchPane } from "../SearchPane";
import "@testing-library/jest-dom";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});
const Wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("MovieList", () => {
  it("selected values are reflecting", () => {
    render(
      <Wrapper>
        <SearchPane
          onChange={() => {}}
          selectedFilters={{ type: "tv" }}
          type="tv"
        />
      </Wrapper>
    );

    const heading = screen.getByTestId("discover_type");
    console.log("heading", heading);
    expect(heading).toHaveTextContent("TVType");
  });
});
