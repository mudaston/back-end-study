const pagination = (page: number, limit: number) => {
  const take = limit > 100 ? 100 : limit;
  let skip = page;

  if (skip === 1) skip = 0;
  if (skip !== 0) skip = skip * take - take;

  return {
    skip,
    take,
  };
};

export default pagination;
