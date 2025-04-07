(function (designSystem, adminjs, React) {
    'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var React__default = /*#__PURE__*/_interopDefault(React);

    const PasswordEdit = props => {
      const {
        onChange,
        property,
        record,
        resource
      } = props;
      const {
        translateButton: tb
      } = adminjs.useTranslation();
      const [showPassword, togglePassword] = React.useState(false);
      React.useEffect(() => {
        if (!showPassword) {
          onChange(property.name, '');
        }
      }, [onChange, showPassword]);
      // For new records always show the property
      if (!record.id) {
        return /*#__PURE__*/React__default.default.createElement(adminjs.BasePropertyComponent.Password.Edit, props);
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, showPassword && /*#__PURE__*/React__default.default.createElement(adminjs.BasePropertyComponent.Password.Edit, props), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        textAlign: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        onClick: () => togglePassword(!showPassword),
        type: "button"
      }, showPassword ? tb('cancel', resource.id) : tb('changePassword', resource.id)))));
    };

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.PasswordEditComponent = PasswordEdit;

})(AdminJSDesignSystem, AdminJS, React);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcGFzc3dvcmRzL2J1aWxkL2NvbXBvbmVudHMvUGFzc3dvcmRFZGl0Q29tcG9uZW50LmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgQnV0dG9uLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBCYXNlUHJvcGVydHlDb21wb25lbnQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IFBhc3N3b3JkRWRpdCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHByb3BlcnR5LCByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHRyYW5zbGF0ZUJ1dHRvbjogdGIgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgY29uc3QgW3Nob3dQYXNzd29yZCwgdG9nZ2xlUGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICghc2hvd1Bhc3N3b3JkKSB7XG4gICAgICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCAnJyk7XG4gICAgICAgIH1cbiAgICB9LCBbb25DaGFuZ2UsIHNob3dQYXNzd29yZF0pO1xuICAgIC8vIEZvciBuZXcgcmVjb3JkcyBhbHdheXMgc2hvdyB0aGUgcHJvcGVydHlcbiAgICBpZiAoIXJlY29yZC5pZCkge1xuICAgICAgICByZXR1cm4gPEJhc2VQcm9wZXJ0eUNvbXBvbmVudC5QYXNzd29yZC5FZGl0IHsuLi5wcm9wc30vPjtcbiAgICB9XG4gICAgcmV0dXJuICg8Qm94PlxuICAgICAge3Nob3dQYXNzd29yZCAmJiA8QmFzZVByb3BlcnR5Q29tcG9uZW50LlBhc3N3b3JkLkVkaXQgey4uLnByb3BzfS8+fVxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxUZXh0IHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gdG9nZ2xlUGFzc3dvcmQoIXNob3dQYXNzd29yZCl9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgIHtzaG93UGFzc3dvcmQgPyB0YignY2FuY2VsJywgcmVzb3VyY2UuaWQpIDogdGIoJ2NoYW5nZVBhc3N3b3JkJywgcmVzb3VyY2UuaWQpfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IFBhc3N3b3JkRWRpdDtcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IFBhc3N3b3JkRWRpdENvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcGFzc3dvcmRzL2J1aWxkL2NvbXBvbmVudHMvUGFzc3dvcmRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5QYXNzd29yZEVkaXRDb21wb25lbnQgPSBQYXNzd29yZEVkaXRDb21wb25lbnQiXSwibmFtZXMiOlsiUGFzc3dvcmRFZGl0IiwicHJvcHMiLCJvbkNoYW5nZSIsInByb3BlcnR5IiwicmVjb3JkIiwicmVzb3VyY2UiLCJ0cmFuc2xhdGVCdXR0b24iLCJ0YiIsInVzZVRyYW5zbGF0aW9uIiwic2hvd1Bhc3N3b3JkIiwidG9nZ2xlUGFzc3dvcmQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIm5hbWUiLCJpZCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJhc2VQcm9wZXJ0eUNvbXBvbmVudCIsIlBhc3N3b3JkIiwiRWRpdCIsIkJveCIsIm1iIiwiVGV4dCIsInRleHRBbGlnbiIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJ0eXBlIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiUGFzc3dvcmRFZGl0Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBR0EsTUFBTUEsWUFBWSxHQUFJQyxLQUFLLElBQUs7TUFDNUIsTUFBTTtRQUFFQyxRQUFRO1FBQUVDLFFBQVE7UUFBRUMsTUFBTTtJQUFFQyxJQUFBQTtJQUFTLEdBQUMsR0FBR0osS0FBSztNQUN0RCxNQUFNO0lBQUVLLElBQUFBLGVBQWUsRUFBRUM7T0FBSSxHQUFHQyxzQkFBYyxFQUFFO01BQ2hELE1BQU0sQ0FBQ0MsWUFBWSxFQUFFQyxjQUFjLENBQUMsR0FBR0MsY0FBUSxDQUFDLEtBQUssQ0FBQztJQUN0REMsRUFBQUEsZUFBUyxDQUFDLE1BQU07UUFDWixJQUFJLENBQUNILFlBQVksRUFBRTtJQUNmUCxNQUFBQSxRQUFRLENBQUNDLFFBQVEsQ0FBQ1UsSUFBSSxFQUFFLEVBQUUsQ0FBQztJQUMvQjtJQUNKLEdBQUMsRUFBRSxDQUFDWCxRQUFRLEVBQUVPLFlBQVksQ0FBQyxDQUFDO0lBQzVCO0lBQ0EsRUFBQSxJQUFJLENBQUNMLE1BQU0sQ0FBQ1UsRUFBRSxFQUFFO1FBQ1osb0JBQU9DLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsNkJBQXFCLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxFQUFLbEIsS0FBTyxDQUFDO0lBQzVEO01BQ0Esb0JBQVFjLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksZ0JBQUcsUUFDVFgsWUFBWSxpQkFBSU0sc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyw2QkFBcUIsQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLEVBQUtsQixLQUFPLENBQUMsZUFDbEVjLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0ksZ0JBQUcsRUFBQTtJQUFDQyxJQUFBQSxFQUFFLEVBQUM7SUFBSSxHQUFBLGVBQ1ZOLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ00saUJBQUksRUFBQTtJQUFDQyxJQUFBQSxTQUFTLEVBQUM7SUFBUSxHQUFBLGVBQ3RCUixzQkFBQSxDQUFBQyxhQUFBLENBQUNRLG1CQUFNLEVBQUE7SUFBQ0MsSUFBQUEsT0FBTyxFQUFFQSxNQUFNZixjQUFjLENBQUMsQ0FBQ0QsWUFBWSxDQUFFO0lBQUNpQixJQUFBQSxJQUFJLEVBQUM7T0FDeERqQixFQUFBQSxZQUFZLEdBQUdGLEVBQUUsQ0FBQyxRQUFRLEVBQUVGLFFBQVEsQ0FBQ1MsRUFBRSxDQUFDLEdBQUdQLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRUYsUUFBUSxDQUFDUyxFQUFFLENBQ3RFLENBQ0osQ0FDSCxDQUNGLENBQUM7SUFDVixDQUFDOztJQzFCRGEsT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRTtJQUUzQkQsT0FBTyxDQUFDQyxjQUFjLENBQUNDLHFCQUFxQixHQUFHQSxZQUFxQjs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
