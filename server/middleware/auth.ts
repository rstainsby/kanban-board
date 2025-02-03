export default defineEventHandler((event) => {
  /**
   * We would normally check the user's session here to confirm they are authenticated
   * and have the correct permissions to access the resource.
   * But as this isn't a real application, we'll just set the user to a default user
   */
  event.context.user = { 
    id: 'e67186bf-8190-47fa-9e0c-ed868d61f8e4',
    name: 'Joe Bloggs',
    email: 'jbloggs@gmail.com',
  }
});