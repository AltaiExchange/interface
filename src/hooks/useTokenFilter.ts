import { useEffect, useState } from "react";
import { TToken } from "@/types/interface.types";
import { TokenList } from "@/utils/constants";

const useTokenFilter = () => {
  const [baseTokens, setBaseTokens] = useState<TToken[]>([]);
  const [quoteTokens, setQuoteTokens] = useState<TToken[]>([]);

  useEffect(() => {
    const base = TokenList.filter((token) => token.isBase);
    const nonBase = TokenList.filter((token) => !token.isBase);

    setBaseTokens(base);
    setQuoteTokens(nonBase);
  }, []);

  return { baseTokens, quoteTokens };
};

export default useTokenFilter;
