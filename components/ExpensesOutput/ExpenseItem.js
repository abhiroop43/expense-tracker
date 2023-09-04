import { Pressable, Text, View } from 'react-native';

function ExpenseItem() {
  return (
    <Pressable>
      <View>
        <View>
          <Text>DESCRIPTION</Text>
          <Text>DATE</Text>
        </View>
        <Text>AMOUNT</Text>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;
