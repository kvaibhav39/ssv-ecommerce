import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDashboardRewardPoints } from "../../store/slice/dashboardSlice";
import { routes } from "../../constants";

const ProjectRewardpoints = () => {
  const dispatch = useDispatch();

  const projectRewardPoints = useSelector(
    (state) => state.dashboard.dashboardRewardPoints
  );
    
  useEffect(() => {
    dispatch(getDashboardRewardPoints());
  }, [dispatch]);
  return (
    <div>
      <div className="project_edit_main_content">
        <div className="col_lg_4 d_grid gap_15">
          {projectRewardPoints?.map((item, i) => {
            return (
              <Link
                to={`${routes.projects}/edit/${item.project_id}`}
                className={`customer_properties_column dashboard_project-link`}
                key={item.id}
              >
                <div className="customer_properties_user_type_name">
                  <p className="customer_properties_user_name">
                    {item.total_points}
                  </p>
                </div>
                <div className="customer_properties_other_details">
                  <span className="customer_properties_other_details_label">
                    Project Name
                  </span>
                  <p className="customer_properties_other_details_text">
                    {item.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectRewardpoints;
