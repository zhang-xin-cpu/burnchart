import React, { useCallback, useMemo, useState } from "react";
import { Pane, Table as UITable } from "evergreen-ui";
import ProgressBar from "./ProgressBar";
import Link from "./Link";
import useIssues from "../hooks/useIssues";
import { sortBy, SortBy } from "../utils/sort";
import addStats from "../utils/addStats";
import "./table.less";
import Icon from "./Icon";

const sortFns = [SortBy.priority, SortBy.name, SortBy.progress];

type UseIssues = ReturnType<typeof useIssues>;

interface Props extends UseIssues {
  heading: string;
}

const Table: React.FC<Props> = ({ heading, error, loading, data }) => {
  const [sortOrder, setSortOrder] = useState<SortBy>(SortBy.priority);

  const onSort = useCallback(() => {
    const i = 1 + sortFns.indexOf(sortOrder);
    if (i === sortFns.length) {
      setSortOrder(sortFns[0]);
    } else {
      setSortOrder(sortFns[i]);
    }
  }, [sortOrder]);

  const withStats = useMemo(() => data.map(addStats), [data]);
  const sorted = useMemo(
    () => sortBy(withStats, sortOrder),
    [withStats, sortOrder]
  );

  if (error || loading) {
    // TODO
    return null;
  }

  return (
    <div className="table">
      <Pane display="flex" flex={1} className="header">
        <div className="heading">{heading}</div>
        <Pane flexGrow={1} className="sort">
          <Link onClick={onSort}>
            <Icon name="sort" /> Sorted by {sortOrder}
          </Link>
        </Pane>
      </Pane>
      <UITable width="100%">
        <UITable.Body>
          {sorted.map((d) => (
            <UITable.Row key={d.id} justifyContent="space-between">
              <UITable.Cell>
                <Link
                  className="strong"
                  routeName="milestones"
                  state={{ owner: d.owner, repo: d.repo }}
                >
                  {d.owner}/{d.repo}
                </Link>
              </UITable.Cell>
              <UITable.Cell>
                <Link
                  routeName="milestone"
                  state={{
                    owner: d.owner,
                    repo: d.repo,
                    number: "" + d.number,
                  }}
                >
                  {d.title}
                </Link>
              </UITable.Cell>
              <UITable.Cell>
                <ProgressBar milestone={d} />
              </UITable.Cell>
            </UITable.Row>
          ))}
        </UITable.Body>
      </UITable>
    </div>
  );
};

export default Table;
